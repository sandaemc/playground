(ns renamer.core
  (:gen-class)
  (:require [clojure.string :as string])
  (:use [clojure.pprint]
        [clojure.java.io :only (reader file)]))

(defn- is-hidden?
  [file]
  (some #(re-find #"^\.\w*" %) 
        (string/split (.getPath file) #"/")))

(defn- is-file?
  [file] 
  (.isFile file)) 

(defn- files 
  [dir]
  (filter (comp not is-hidden?) 
          (filter is-file? (file-seq (file dir)))))

(defn- replace-text
  [file match replacement]
  (spit file 
        (string/replace (slurp file) match replacement)))

(defn -main [& args] 
  (let [[dir match replacement] args]
    (doall 
      (map #(replace-text %(java.util.regex.Pattern/compile match) replacement) 
           (files dir)))))
