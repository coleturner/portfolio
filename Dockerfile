FROM node:7.7.2

ENV USER node
ENV NODE_ENV development
ENV PORT 7000
ENV PATH="/usr/local/bin:$PATH"

COPY ["./package.json", "/home/$USER/"]
ADD . /home/$USER
WORKDIR /home/$USER
RUN chown $USER --recursive /home/$USER

USER $USER

RUN yarn install
RUN npm rebuild node-sass

EXPOSE $PORT
CMD if [ ${NODE_ENV} = production ]; \
	then \
  yarn run webpack -- -p; \
	yarn run pm2-docker start processes.json -- -i 0; \
	else \
	yarn run pm2-dev start processes.json -- --ignore public; \
	fi
