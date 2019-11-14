(ns wallet-api.persistence
  (:require [environ.core :refer [env]]
            [clojure.java.jdbc :as jdbc]))

(def db-spec {:dbtype "postgresql"
              :dbname "sampledb"
              :host "172.17.0.2"
              :user "postgres"})

(defn test-query []
  (jdbc/query db-spec ["SELECT 3*5 AS result"]))