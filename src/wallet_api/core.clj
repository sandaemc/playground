(ns wallet-api.core
  (:gen-class)
  (:require [cheshire.core :refer [generate-string]]
            [clojure.set :refer [rename-keys]]
            (wallet-api
             [persistence :refer [insert-transaction]]
             [transformation :refer [prepare-transaction]]
             [domain :refer [get-transactions]])))

(extend-protocol cheshire.generate/JSONable
  java.time.Instant
  (to-json [dt gen]
    (cheshire.generate/write-string gen (str dt))))

(defn pretty [json]
  (println (generate-string json {:pretty true})))

;(def address-key "38ENmTr2AD1avJrmmi9iM7PfS6nZVmuMKf")

(defn -main [& args]
  (if-let [address-key (first args)]
    (doseq [txn (pmap prepare-transaction (get-transactions address-key))]
       (insert-transaction (select-keys txn [:address :id :created_at :value_in :value_out])))))