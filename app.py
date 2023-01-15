from flask import Flask, json, request, jsonify
import os
import cv2
import numpy as np
from disease import d
from flask_cors import CORS

# import sk
# from keras.preprocessing.image import img_to_ar
from tensorflow.keras.preprocessing.image import img_to_array
from werkzeug.utils import secure_filename
import pickle
from tensorflow.keras.models import load_model, Model

app = Flask(__name__)
CORS(app)
app.secret_key = "caircocoders-ednalan"

UPLOAD_FOLDER = 'static'

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'JPG'])

# model = pickle.load(open('./cnn_model.pkl', 'rb'))

label_binarizer = pickle.load(open('label_transform.pkl', 'rb'))

model = load_model('trained_model.h5')


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/')
def main():
    return 'Homepage'


@app.route('/upload', methods=['POST'])
def upload_file():

    if 'image' not in request.files:
        return jsonify({'error': 'image not provided'}), 400
    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'no image provided'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(filename=file.filename)
        print(filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        root_dir = f'D:/DATA SCIENCE/static/{filename}'
        # f = f.join('static',filename)
        # print(root_dir)

        dictionary = check(root_dir)
    return jsonify(dictionary)


def convert_image_to_array(image_dir):
    try:
        image = cv2.imread(image_dir)
        if image is not None:
            image = cv2.resize(image, tuple((256, 256)))
            return img_to_array(image)
        else:
            return np.array([])
    except Exception as e:
        print(f"Error : {e}")
        return None


def check(img):
    image_dir = img
    im = convert_image_to_array(image_dir)
    np_image_li = np.array(im, dtype=np.float16) / 225.0
    npp_image = np.expand_dims(np_image_li, axis=0)

    # loaded_model = pickle.load(open('./cnn_model.pkl', 'rb'))
    result = model.predict(npp_image)
    # return result
    print(f"{result}")
    itemindex = np.where(result == np.max(result))
    disease = label_binarizer.classes_[itemindex[1][0]]
    prob = np.max(result)
    print("probability : "+str(np.max(result))+"\n" +
          label_binarizer.classes_[itemindex[1][0]])

    # d[f'{disease}']
    print(d[f'{disease}'])

    prob = str(prob)

    data = {"probality": prob, 'disease': disease, "sol": d[f'{disease}']}
    return data

# print(label_binarizer.classes_)


if __name__ == '__main__':
    app.run(debug=True)
