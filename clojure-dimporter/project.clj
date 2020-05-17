(defproject org.smaak/dimporter "0.1.2-SNAPSHOT"
  :description "An ETL Data Validation Framework"
  :url "https://github.com/smaak/dimporter"
  :main dimporter.core
  :aot [dimporter.core]
  :repositories [["releases" {:url "https://clojars.org/org.smaak/dimporter"}]]
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [org.clojure/data.csv "0.1.2"]])
