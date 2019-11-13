(ns wallet-api.core
  (:require (wallet-api
             [http :refer [http-get]])))

(def base-url "https://btc1.trezor.io/api")

(defn get-total-pages [address]
  (:totalPages address))

(defn get-transaction-ids [address]
  (:transactions address))


(defn get-address 
  ([key] (http-get (str base-url "/address/" key)))
  ([key page-num] (http-get (str base-url "/address/" key) {:page page-num })))

(defn get-transaction-list [key]
  (let [address (get-address key)
        pages (range 1 (+ (get-total-pages address) 1))]
    (apply concat (->> (map #(get-address key %) pages)
                       (map #(:transactions %))))))

(def address-key "38ENmTr2AD1avJrmmi9iM7PfS6nZVmuMKf")

(defn foo
  "I don't do a whole lot."
  []
  (println (count (get-transaction-list address-key))))

(defn -main []
  (foo))