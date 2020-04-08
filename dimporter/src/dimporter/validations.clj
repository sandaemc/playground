(ns dimporter.validations)

(defn ^:validation? int?
  []
  (fn [value]
    (integer? value)))
