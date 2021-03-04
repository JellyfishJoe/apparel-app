from flask import request, redirect

@app.route('/wardrobe', methods = ['POST'])
def signup():
    image = request.form['rawImage']
    print("The image" + image + "'")
    return redirect('/detail')

@app.route('/wardrobe', methods = ['POST'])

