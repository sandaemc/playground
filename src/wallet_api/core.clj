(ns wallet-api.core
  (:gen-class)
  (:require [cheshire.core :refer [generate-string]]
            (wallet-api
             [domain :refer [get-transactions]])))

(defn pretty [json]
  (println (generate-string json {:pretty true})))

;(def address-key "38ENmTr2AD1avJrmmi9iM7PfS6nZVmuMKf")

(defn -main [& args]
  (if-let [address-key (first args)]
    (doseq [txn (get-transactions address-key)]
      (pretty txn))))