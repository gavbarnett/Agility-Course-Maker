# Agility Course Maker
Open Source & Online dog agility course design tool.

Link: [AgilityCourseMaker.com](https://agilitycoursemaker.com/)

Keyboard & mouse driven interface. -> Now also touch compatible!
Allows designs to be saved to/loaded from the users computers as a JSON file. 

  JSON file Includes: 
  
  1. X,Y coordinates of equipment in meters, relative to top left corner
  2. Rotation of equipment in radians
  3. Additional variables (tunnel length/ bend radius)
  4. Notes made on design
  
Allows designs to printed to pdf or paper.

No server, No log-in. And it's free.

*This is still a work in progress so feedback welcome!*

Currently optimised for Desktop on Chrome, but functional on Edge, Firefox, IE, Safari, Android and iPad devices.

# Run local server for test
The simplest probably is to use Python's built-in http server.

If you have Python installed, it should be enough to run this from a command line:

## Python 2.x
python -m SimpleHTTPServer
## Python 3.x
python -m http.server
This will serve files from the current directory at localhost under port 8000:

http://localhost:8000/
