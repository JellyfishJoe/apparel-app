from flask import request, redirect


@app.route('/wardrobe', methods = ['POST'])
def signup():
    resp = flask.Response("Foo bar baz")
    resp.headers['Access-Control-Allow-Origin'] = '*'

    image = request.form['rawImage']
    print("The image" + image + "'")
     #insert color py
     
    return resp



@app.route('/wardrobe', methods = ['POST'])

