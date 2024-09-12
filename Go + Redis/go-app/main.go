package main

import (
	"context"
	"fmt"
	"net/http"

	"github.com/go-redis/redis/v8"
)

var ctx = context.Background()

func main() {
	rdb := redis.NewClient(&redis.Options{
		Addr: "redis:6379",
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		err := rdb.Set(ctx, "counter", 1, 0).Err()
		if err != nil {
			fmt.Fprintf(w, "Error: %v", err)
			return
		}

		val, err := rdb.Get(ctx, "counter").Result()
		if err != nil {
			fmt.Fprintf(w, "Error: %v", err)
			return
		}

		fmt.Fprintf(w, "Counter value: %s", val)
	})

	http.ListenAndServe(":8080", nil)
}
