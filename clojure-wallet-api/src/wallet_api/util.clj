(ns wallet-api.util
  (:require [cheshire.core :refer [generate-string]]))

(extend-protocol cheshire.generate/JSONable
  java.time.Instant
  (to-json [dt gen]
    (cheshire.generate/write-string gen (str dt))))

(defn pretty [json]
  (println (generate-string json {:pretty true})))