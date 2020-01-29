(ns dimporter.transformations)

(defn ^:transformation? truncate
  [& {:keys [len]}]
  (fn [value]
    (clojure.string/join (take len value))))
