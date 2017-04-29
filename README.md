# Persempre

The app name Persempre means Forever in Italian and was create to replace Nodemon in a docker environment.

# Why you say?

I personally love Docker, and run everything throw it, but the big issue is that Docker won't bobble the events related to a file change if your run a VM machine on your host and run inside the VM a Docker environment while mounting a folder with your code from the originally host environment inside the VM and then mount that folder inside a Docker. As you can see there are lots of nesting.

This situation makes it so that an file change event won't reach Docker, and if you use Nodemon you'll need to use the `legacy` mode. Which is nothing more then a infinite `while` loop that constantly goes over each file in your project and thus uses a lot of CPU time. To the point that my VM is sign 110% of the CPU and my MacBook Ari gets very hot.

# The solution!

Because of this poorly designed legacy mode I decided to write  my own solution that is more mindful of the CPU, and tries to minimize the CPU time used to check when a file was changed.

# How it works?

My app uses one timer that runs every 4 sec and goes over each file in the project while checking the time a file was change. This approach is way more efficient because it uses the CPU only every 4 sec and in between the brakes the system has the time to perform other operation.

# When should this project be used?

Only if you work with a Docker container or if you need to use the legacy mode of Nodemon. If that is the case fell free to use this project instead.

# The End

If you've enjoyed this article/project, please consider giving it a 🌟. Also check out my [GitHub account](https://github.com/davidgatti), where I have other articles and apps that you might find interesting.

## Where to follow

You can follow me on social media 🐙😇, at the following locations:

- [GitHub](https://github.com/davidgatti)
- [Twitter](https://twitter.com/dawidgatti)
- [Instagram](https://www.instagram.com/gattidavid/)

## More about me

I don’t only live on GitHub, I try to do many things not to get bored 🙃. To learn more about me, you can visit the following links:

- [Podcasts](http://david.gatti.pl/podcasts)
- [Articles](http://david.gatti.pl/articles)
- [Technical Articles](http://david.gatti.pl/technical_articles)
- [Software Projects](http://david.gatti.pl/software_projects)
- [Hardware Projects](http://david.gatti.pl/hardware_projects)