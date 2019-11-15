(ns wallet-api.persistence
  (:require [environ.core :refer [env]]
            [honeysql.core :as sql]
            [honeysql.helpers :refer [insert-into values]]
            [clojure.java.jdbc :as jdbc]))

(def db-spec (env :database-uri))

(defn- exec [query]
  (println (sql/build query))
  (jdbc/insert! db-spec (sql/build query)))

(defn insert-transaction [txn]
  (jdbc/insert! db-spec :transactions txn))

(defn insert-entry [entry]
  (jdbc/insert! db-spec :entries entry))