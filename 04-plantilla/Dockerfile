ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine as stage_base
WORKDIR /app

FROM stage_base as stage_deps 
RUN --mount=type=bind,source=package.json,target=package.json \ 
    --mount=type=bind,source=package-lock.json=,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm run ci --omit-dev

FROM stage_base as stage_build 
RUN --mount=type=bind,source=package.json,target=package.json \ 
    --mount=type=bind,source=package-lock.json=,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm run ci

COPY . .
RUN npm run build

FROM stage_base as stage_final
USER node 
# usuario node creado por default  en las imagenes de node
COPY --from=stage_deps /app/node_modules /node_modules
COPY --from=stage_build /app/dist /dist
COPY package.json .

CMD npm start