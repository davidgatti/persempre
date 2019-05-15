# Persempre

The app name Persempre means Forever in Italian and was create to replace [Nodemon](https://www.npmjs.com/package/nodemon) in a docker environment.

# Why you say?

I personally love Docker, and run everything through it, but the big issue is that Docker won't bobble the events related to a file change if your run a VM machine on your host, and inside the VM a Docker environment while mounting a folder with your code from the originally host environment inside the VM and then mount that folder inside a Docker container. As you can see there are lots of nesting.

This situation makes it so that a file change event won't reach Docker, and if you use [Nodemon](https://www.npmjs.com/package/nodemon) you'll need to use the `legacy` mode. Which is nothing more then a infinite `while` loop that constantly goes over each file in your project and thus uses a lot of CPU time - to the point that my VM is sign a constant 110% of the CPU and my MacBook Ari gets very hot.

# The solution!

Because of this poorly designed legacy mode I decided to write  my own solution that is more mindful of the CPU, and tries to minimize the CPU time used to check when a file was changed.

# How it works?

My app uses one timer that runs every 4 sec and goes over each file in the project while checking the time a file was change. This approach is way more efficient because it uses the CPU only every 4 sec and in between the brakes the system has the time to perform other operation.

# When should this project be used?

Only if you work with a Docker container or if you need to use the legacy mode of [Nodemon](https://www.npmjs.com/package/nodemon). If that is the case fell free to use this project instead.

# How to use this package?

Just install this package globally with the following command

```
$ npm install persempre -g
```
Then you can just type:

```
$ persempre FILE_TO_RUN
```
# Is this an ideal solution?

Far from it. But this is the best solution for the problem. Ideally you would want to let the operating system tell you when a file was change, but since a Docker container is unable to provide this information as of now.

Please don't use this module if you run your NodeJS project directly on your machine.

# The End

If you enjoyed this project, please consider giving it a 🌟. And check out my [GitHub account](https://github.com/davidgatti), where you'll find additional resources you might find useful or interesting.

## Sponsor 🎊

This project is brought to you by 0x4447 LLC, a software company specializing in building custom solutions on top of AWS. Follow this link to learn more: https://0x4447.com. Alternatively, send an email to [hello@0x4447.email](mailto:hello@0x4447.email?Subject=Hello%20From%20Repo&Body=Hi%2C%0A%0AMy%20name%20is%20NAME%2C%20and%20I%27d%20like%20to%20get%20in%20touch%20with%20someone%20at%200x4447.%0A%0AI%27d%20like%20to%20discuss%20the%20following%20topics%3A%0A%0A-%20LIST_OF_TOPICS_TO_DISCUSS%0A%0ASome%20useful%20information%3A%0A%0A-%20My%20full%20name%20is%3A%20FIRST_NAME%20LAST_NAME%0A-%20My%20time%20zone%20is%3A%20TIME_ZONE%0A-%20My%20working%20hours%20are%20from%3A%20TIME%20till%20TIME%0A-%20My%20company%20name%20is%3A%20COMPANY%20NAME%0A-%20My%20company%20website%20is%3A%20https%3A%2F%2F%0A%0ABest%20regards.).
