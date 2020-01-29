(ns wallet-api.core
  (:gen-class)
  (:require (wallet-api
             [util :refer [pretty]]
             [persistence :refer [insert-transaction insert-entry]]
             [transformation :refer [prepare-transaction]]
             [domain :refer [get-transactions]])))

(defn -main [& args]
  (if-let [address-key (first args)]
    (doseq [txn (pmap prepare-transaction (get-transactions address-key))]
      (insert-transaction txn [:address :id :created_at :value_in :value_out])
      (doseq [entry (:entries txn)]
        (-> (assoc entry :transaction_id (:id txn))
            (insert-entry [:address :transaction_id :is_in :value]))))))
