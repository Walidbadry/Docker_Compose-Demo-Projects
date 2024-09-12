FROM golang:1.16

WORKDIR /usr/src/app

COPY . .

RUN go mod init example.com/go-app && \
    go get github.com/go-redis/redis/v8 && \
    go build -o go-app

EXPOSE 8080

CMD ["./go-app"]
