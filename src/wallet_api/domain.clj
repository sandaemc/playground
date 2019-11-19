(ns wallet-api.domain
  (:require (wallet-api
             [http :refer [http-get]])))

(def base-url "https://btc1.trezor.io/api")

(defn- get-total-pages [address]
  (:totalPages address))

(defn- get-address 
  ([key] (http-get (str base-url "/address/" key)))
  ([key page-num] (http-get (str base-url "/address/" key) {:page page-num })))

(defn- get-transaction [txn]
  (http-get (str base-url "/tx/" txn)))

(defn get-transaction-ids [key]
  (let [address (get-address key)
        pages (range 1 (+ (get-total-pages address) 1))]
        ;pages (range 1 3)]
    (apply concat (->> (pmap #(get-address key %) pages)
                       (map #(:transactions %))))))

(defn add-address [txn key]
  (assoc txn :address key))

(defn get-transactions [key]
  (map #(assoc % :address key) (pmap get-transaction (get-transaction-ids key))))
