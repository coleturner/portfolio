FROM node:8.9.0

ENV USER node
ENV NODE_ENV development
ENV SASS_BINARY_NAME linux-x64-51_binding.node
ENV PORT 7000
ENV PATH="/usr/local/bin:$PATH"

COPY ["./package.json", "/home/$USER/"]

ADD . /home/$USER
WORKDIR /home/$USER
RUN chown $USER --recursive /home/$USER

USER $USER

RUN yarn install && npm rebuild node-sass

EXPOSE $PORT
CMD yarn run pm2-dev start processes.json -- --ignore public;