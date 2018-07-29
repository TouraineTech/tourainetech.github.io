.PHONY: all build start stop restart logs

APPNAME     := website
VERSION     := 1.0.0
TEAM        := tourainetech
IMAGE       := $(TEAM)/$(APPNAME):$(VERSION)

#Usefull in remote Docker host management
#DOCKER_HOST ?= tcp://127.0.0.1:2375
#DOCKER_CMD  := $(DOCKER_BIN) -H $(DOCKER_HOST)
DOCKER_BIN  ?= docker
WORKSPACE   ?= .
DOCKER_CMD = $(DOCKER_BIN)


NO_COLOR=\033[33;0m
OK_COLOR=\033[33;32m
ERR_COLOR=\033[33;31m
INFO_COLOR=\033[33;01m

all: build start

build:
	@echo "$(INFO_COLOR)Building $(IMAGE)...$(NO_COLOR)"
	rm -rf ./node_modules
	$(DOCKER_CMD) build --rm -t $(IMAGE) $(WORKSPACE)
	@echo "$(OK_COLOR)Building $(IMAGE): Done$(NO_COLOR)"

sync:
	@echo "$(INFO_COLOR)Synchronizing node_modules$(NO_COLOR)"
	$(DOCKER_CMD) cp $(APPNAME):/data/node_modules .
	@echo "$(OK_COLOR)Sync with $(APPNAME): Done$(NO_COLOR)"

start:
	@echo "$(INFO_COLOR)Starting $(IMAGE)...$(NO_COLOR)"
	$(DOCKER_CMD) run $(docker_run_flags) \
				-d -p 4000:4000 \
				--name $(APPNAME) $(IMAGE) npm start
	@echo "$(OK_COLOR)Starting $(IMAGE): Done$(NO_COLOR)"

stop:
	@echo "$(INFO_COLOR)Stopping $(IMAGE)...$(NO_COLOR)"
	-$(DOCKER_CMD) rm -f $(APPNAME)
	@echo "$(OK_COLOR)Stopping $(IMAGE): Done$(NO_COLOR)"

restart: stop start

logs:
	$(DOCKER_CMD) logs -f $(APPNAME)

dev:
	$(eval docker_run_flags += -v $(PWD):/data)

install: dev
	$(DOCKER_CMD) run --rm $(docker_run_flags) $(IMAGE) npm install
