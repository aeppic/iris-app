Note: This is work-in-progress we are still building this up

## Intro

IRIS is a way to easily build flexible and high-quality business applications.

It starts by providing the ability to make creating forms extremely easy using an extended
markdown like syntax we call formdown.

```
Hello !

we would like to know more about you. What is your name ?

[First Name][firstName] [Last Name][lastName]
```    

A definition like this would result in this:

![Form 1](./images/screenshots/form-1.JPG)

Rendering a form like this is easy and can be helpful standalone.

Forms are usually used to collect data though and thus by default forms are the basis to create documents.  


## Features

IRIS has been designed as a progressive architecture from small forms on a static webpage to full-fledged enterprise ready
business applications. The key for us is to allow for different usage levels. Not everybody needs a fully hosted, company
workflow integrated hosted solution with snapshots, staging, history rollback etc. 

  * Flexible Forms
  * Hierachical Document Storage
  * Versioning
  * Controls
  * Designs
  * Lists
  * Queries
  * Controllers
  * Business Rules
  * Hosted Services

... and more

--- There will be more documentation here in the near future

## Questions

Q: Do you have a WYSIWYG form designer ?

A: No. We decided early on to not supply that, since a form definition should be about structural content first.
Users should concentrate on what they want to capture first and foremost and not too much on how it looks.

The rendered forms look nice enough out ouf the box and can be styled and influenced using controls. Part of becoming
more productive building business applications though means a good seperation of work and responsibilities. 
The few forms that are constantly being used and where the default look doesn't suffice can then be easily restyled
after the fact by an actual HTML designer or developer. 

That said we are not totally opposed to it and if we find a good way to ensure a nice design experience without
overloading it we might do it one day but current day form designers often become a poor mans html designer tool and there
are already a number of those around.

## Background

In progress :) We are currently moving this over from our internal system. This will take a few weeks ...
