# dimporter

A Data Validation Framework.

## Usage

```clojure
(:use [dimporter.core])
(:require 
	[dimporter.validations :as validate]
	[dimporter.transformations :as transform])
			
(def users (datasource (csv "data/users.csv")
                       (fields [:id 		(validate/int?)]
                               [:username 	(transform/truncate :len 20)]
                               :password 
                               :last_name
                               :first_name
                               :role)))

(filter #(= (:role %) "Administrator") users) ; Return all administrators in the data
```

## License

Copyright © 2014 Sandae Macalalag

Distributed under the Eclipse Public License, the same as Clojure.
