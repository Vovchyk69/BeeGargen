## Description

As our application has been written in Node.js which doesn't support support multithreading, it means that it runs as a single operating system process that represents the instance of the program running. Within that process, Node.js executes programs on a single thread what cutts off a lot of concurrency patterns.

A key strategy to work around this problem is to launch a child process, or a process created by another process, when faced with long-running tasks. When a new process is launched, the operating system can employ multiprocessing techniques to ensure that the main Node.js process and the additional child process run concurrently, or at the same time.

So we have been discussing the approach a couple of times and decided to apply this technique here. As adding media in a web service is the most important functionality, because the convenience of the service depends on it, we optimized it in such a way that the main Node.js process was not blocked by adding new media and could serve many users at the same time. That is, so that the user can simultaneously listen to existing media and add new ones in the background.

To develop this method, the Event-Emitter design pattern was used. It is basic for Node.js applications and most system modules use it. It consists of an event emitter and an event handler. We also used the ability to create child processes in Node.js. This process is schematically shown in Picture 3 in Architecture Document and the part "Creating a background task".

This process consists of the following steps:
 - A request to create a new media is sent to the server.
 - The server receives the image for processing and responds to the client about the start of the processing process.
 - The main node.js process creates a child process using the "fork" method from the "child_process" system module.
 - The main process sends to the new one all the data to create a new media by generating an event (emit event) in the shared stream (stream module)
 - The child process reads the event, the event handler accepts all the necessary data and creates a new media by writing to all the necessary Google services
 - After successful creation, the child process terminates and deletes all data from RAM.
 - Thus the main process is not busy adding new media and can always accept new requests. This implementation shows how easy it is to scale Node.js applications horizontally using all the resources of one server.


