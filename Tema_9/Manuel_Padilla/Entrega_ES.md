Parte I) Generar un alias
curl --location 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/_aliases' \
--header 'Content-Type: application/json' \
--data '{
    "actions": [
        {
            "add": {
                "index": "employees",
                "alias": "employees-alias"
            }
        }
    ]
}'

Parte II) Inserción de elementos
ID: 9foJM5cBTo8i77nQzFrZ

curl --location 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_doc' \
--header 'Content-Type: application/json' \
--data '{
   "FirstName":"MANUEL FERNANADO",
   "LastName":"PADILLA",
   "Designation":"Software Development",
   "Salary":"2035000",
   "DateOfJoining":"2002-01-13",
   "Address":"8445 Green Street Morristown, NJ 07960",
   "Gender":"Male",
   "Age":39,
   "MaritalStatus":"Married",
   "Interests":"R/C Boats,Dolls,Cloud Watching,Animals/pets/dogs,Crocheting,Casino Gambling"
}'

parte III  Obtención simple de elementos
curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_doc/9foJM5cBTo8i77nQzFrZ' \
--header 'Content-Type: application/json' \
--data '{
   "FirstName":"MANUEL FERNANADO",
   "LastName":"PADILLA",
   "Designation":"Software Development",
   "Salary":"2035000",
   "DateOfJoining":"2002-01-13",
   "Address":"8445 Green Street Morristown, NJ 07960",
   "Gender":"Male",
   "Age":39,
   "MaritalStatus":"Married",
   "Interests":"R/C Boats,Dolls,Cloud Watching,Animals/pets/dogs,Crocheting,Casino Gambling"
}'


parte IV - Eliminación de elementos
curl --location --request DELETE 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_doc/9foJM5cBTo8i77nQzFrZ'

Parte V) Consultas
i.
curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
    "query": {
        "term": {
            "Designation": {
                "value": "Software Engineer"
            }
        }
    }
}'

ii.
curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
    "query": {
        "bool": {
            "must_not":{
            "term": {
                "Designation":"Software Engineer"
            }
            }
        }
    }
}'


iii.
curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
   "from": 0,
  "size": 35,
  "query": {
    "match": {
      "Designation": "Software Engineer"
    }
  }
}'

iv.
curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
   "from": 70,
  "size": 35,
  "query": {
    "match": {
      "Designation": "Software Engineer"
    }
  }
}'

v.
curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
       "from": 0,
  "size": 13,
"query": {
    "range": {
      "Salary": {
        "gt": 67000
 
      }
    }
  }
}'

vi.
curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data ' {
"query": {
    "range": {
      "DateOfJoining": {
        "gte": "2003-05-01",
 "lte":"2003-05-31"
      }
    }
  }
}'

    "hits": {
        "total": {
            "value": 8,
            "relation": "eq"

vii.
curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
    "query": {
        "match": {
            "FirstName": "NATALIE"
        }
    }
}'

viii.
curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
    "query": {
        "multi_match": {
            "query": "Street",
            "type": "bool_prefix",
            "fields": [
                "Address",
                "Address._2gram",
                "Address._3gram"
            ]
        }
    }
}'

ix.
curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
    "query": {
        "multi_match": {
            "query": "wood",
            "type": "bool_prefix",
            "fields": [
                "Address",
                "Address._2gram",
                "Address._3gram"
            ]
        }
    }
}

x.
curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
    "query": {
        "match": {
            "Interests": "Wrestling"
        }
    }
}'

xi.

curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
    "size": 0,
    "query": {
        "match": {
                  "Interests": "Wrestling"
        }
    },
    "aggs": {
        "Generos": {
            "terms": {
                "field": "Gender"
            }
        }
    }
}'

xii.
curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
   "size":0,

   "aggs":{
      "Generos":{
         "terms":{
            "field":"Gender"
         },
         "aggs":{
            "Edad media":{
               "avg":{
                  "field":"Age"
               }
            }
         }
      }
   }
} '
xiii.
curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
"aggs": {
    "price_ranges": {
      "range": {
        "field": "Salary",
        "ranges": [
          { "to": 59999 },
          { "from": 60000, "to": 67000 },
          { "from": 67001 }
        ]
      }
    }
  }
}'

xiv.
curl --location --request GET 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-alias/_search' \
--header 'Content-Type: application/json' \
--data '{
  "aggs": {
    "price_ranges": {
      "range": {
        "field": "Salary",
        "ranges": [
          { "to": 59999 },
          { "from": 60000, "to": 67000 },
          { "from": 67001 }
        ]
      },
      "aggs": {
        "marital_status": {
          "terms": {
            "field": "MaritalStatus"  
          }
        }
      }
    }
  }
}
'

Parte VI) Crear otro índice y modificar el alias
curl --location --request PUT 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees-v2' \
--data ''

iii.
curl --location --request DELETE 'https://e15awis6e1:dk1w7tu1o2@unir-search-7279989620.us-east-1.bonsaisearch.net:443/employees'
