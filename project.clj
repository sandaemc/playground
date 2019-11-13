(defproject wallet-api "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :aot [wallet-api.core]
  :main wallet-api.core
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [cheshire "5.9.0"]
                 [clj-http "3.10.0"]
                 [ring/ring-codec "1.1.2"]
                 [honeysql "0.9.8"]])
