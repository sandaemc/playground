(ns wallet-api.http
  (:require [clj-http.client :as http]
            [ring.util.codec :refer [url-encode]]
            [cheshire.core :as json]))

(defn- json-body [response]
  (json/decode (:body response) true))

(defn- make-query-string [m & [encoding]]
  (let [s #(if (instance? clojure.lang.Named %) (name %) %)
        enc (or encoding "UTF-8")]
    (->> (for [[k v] m]
           (str (url-encode (s k) enc)
                "="
                (url-encode (str v) enc)))
         (interpose "&")
         (apply str))))

(defn- build-url [url-base query-map & [encoding]]
  (str url-base "?" (make-query-string query-map encoding)))

(defn http-get
  ([url] (-> (http/get url) json-body))
  ([url params] (http-get (build-url url params))))