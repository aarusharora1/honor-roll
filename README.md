# [Check it out](https://shs-honor-roll.web.app/)
A simple web app that is used to search available honor roll records from Stevenson High School in Lincolnshire, Illinois. Stevenson publishes pdf versions of both Green and Gold Honor rolls on a semesterly basis. Using [pdfminer](https://github.com/pdfminer/pdfminer.six), I parsed the pdfs with a [python script](./pdfs-and-parser/parse.py) and stored the output in an easy to read [json file](./pdfs-and-parser/output.json).  Then, I built a restful(?) API using Node.js & Express.js which allowed users to access information in the JSON file easily. Unfortunately, due to the constrained budget of this project ($0), I was unable to find a good way to host Node.js reliably (Heroku wasn't great, if you know any others, please let me know). While the Node.js backend works just fine, I decided to migrate the backend to AWS Lambda and allow access using the API Gateway. It is hosted on Firebase. 

# If you see issues with the data
Please create an [Issue](https://github.com/aarusharora1/honor-roll/issues) with details. 

# Contributing
If you know CSS/Bootstrap/Tailwind or have any minimum level of graphic design talent, please help me out and make the website look good. 
# License
This is not protected or anything, do whatever you want!
