(ns wallet-api.persistence
  (:require [environ.core :refer [env]]
            [honeysql.core :as sql]
            [honeysql.helpers :refer [insert-into values]]
            [clojure.java.jdbc :as jdbc]))

(def db-spec (env :database-uri))

(defn insert-transaction [txn ks]
  (jdbc/insert! db-spec :transactions (select-keys txn ks)))

(defn insert-entry [entry ks]
  (jdbc/insert! db-spec :entries (select-keys entry ks)))