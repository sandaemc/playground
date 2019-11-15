(ns wallet-api.transformation
  (:require [clojure.edn :as edn]
            [clojure.set :refer [rename-keys]]))

(defn- as-num [val k]
  (edn/read-string (get val k)))

(defn- as-date [val k]
  (java.sql.Timestamp/from (java.time.Instant/ofEpochSecond (get val k))))

(defn- parse-value [val k method]
  (assoc-in val [k] (method val k)))

(defn- transform-values [txn]
  (-> (parse-value txn :valueIn as-num)
      (parse-value :valueOut as-num)
      (parse-value :time as-date)
      (parse-value :fees as-num)))

(defn- to-out [m]
  {:value (as-num m :value)
   :index (:n m)
   :address (get-in m [:scriptPubKey :addresses 0])
   :isIn? false})

(defn- to-in [m]
  {:value (as-num m :value)
   :index (:n m)
   :address (get-in m [:addresses 0])
   :isIn? true})

(defn- get-entries [transaction]
  (let [outs (sort-by :index (map to-out (:vout transaction)))
        ins (sort-by :index (map to-in (:vin transaction)))]
    (concat outs ins)))

(defn- filtered-keys [transaction]
  (transform-values (select-keys transaction
                                 [:fees :time :valueIn :valueOut :txid :address])))

(defn prepare-transaction [transaction]
  (let [data (filtered-keys transaction)
        entries (get-entries transaction)]
    (-> (assoc data :entries entries)
        (rename-keys {:txid :id
                      :time :created_at
                      :valueIn :value_in
                      :valueOut :value_out}))))
