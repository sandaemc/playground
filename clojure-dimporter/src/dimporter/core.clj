(ns dimporter.core
  (:gen-class)
  (:require [clojure.data.csv :as csv]
            (dimporter
              [validations :as validate]
              [transformations :as transform]))
  (:use [clojure.java.io :only (reader)]))

(defn fields [& definitions]
  {:headers (map #(if (vector? %) (first %) %) definitions)
   :mapping (->>
              (map #(if (vector? %)
                      (hash-map (first %) (rest %))
                      (hash-map % [])) definitions)
              (reduce merge))})

(defn csv [file & {:keys [separator enclosure] :or {separator \, enclosure \"}}]
  (let [in-file (reader file)
        csv-seq (csv/read-csv in-file :separator separator :quote enclosure)
        lazy (fn lazy [wrapped]
               (lazy-seq
                 (if-let [s (seq wrapped)]
                   (cons (first s) (lazy (rest s)))
                   (.close in-file))))]
    (lazy csv-seq)))


(defn- func-meta [f]
  (meta (apply ns-resolve
               (map symbol
                    (butlast (clojure.string/split (str f) #"\$"))))))

;{:username "sandae" :last_name "macalalag"} [[:username (validate/int?) (transform/truncate :len 2)] :last_name "macalalag"]
;(defn- apply-filters [line mapping]
;  (doseq [k (map key line)]
;    (doseq [
;  (->
;    (assoc line :__dirty false)))

(defn datasource [lines {:keys [headers mapping]}]
  (map #(zipmap headers %) lines))
;       (filter #(= (count headers) (count %)) lines)))
;(map #(apply-filters % mapping))
;(remove #(:invalid %)))))
