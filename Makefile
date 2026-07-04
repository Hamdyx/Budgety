.ONESHELL:

UNAME_S := $(shell uname -s)
ifeq ($(UNAME_S),Darwin)
	OPEN_CMD := open
else
	OPEN_CMD := xdg-open
endif


## SETUP

.PHONY: install
install:
	corepack enable
	yarn install

.PHONY: install/ci
install/ci:
	corepack enable
	yarn install --immutable


## DEV

.PHONY: dev
dev:
	yarn dev

.PHONY: preview
preview: build
	yarn preview


## BUILD

.PHONY: build
build:
	yarn build


## LINTERS

.PHONY: lint
lint:
	yarn lint

.PHONY: lint/fix
lint/fix:
	yarn lint:fix


## TESTS

# make test
# make test file=src/features/budget/components/AddTransactionForm/AddTransactionForm.test.tsx
# make test file=src/features/budget/components/AddTransactionForm/AddTransactionForm.test.tsx pattern="submits a new transaction"
.PHONY: test
test:
	yarn test $(if $(file),$(file)) $(if $(pattern),--testNamePattern="$(pattern)")

.PHONY: test/watch
test/watch:
	yarn test:watch $(if $(file),$(file)) $(if $(pattern),--testNamePattern="$(pattern)")

.PHONY: test/coverage
test/coverage:
	yarn test --coverage
	@if [ -f coverage/index.html ]; then \
		$(OPEN_CMD) coverage/index.html; \
	fi


## CI

.PHONY: ci
ci: lint build test


