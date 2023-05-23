FROM golang:1.20.0-bullseye

# Ignore APT warnings about not having a TTY
ENV DEBIAN_FRONTEND noninteractive

# install build essentials
RUN apt-get update && \
	apt-get install -y wget build-essential pkg-config --no-install-recommends

WORKDIR /app
COPY . .

RUN go build -v -o dipso .

CMD /app/dipso
EXPOSE 8080
