from __future__ import print_function
import binascii
import struct
from PIL import Image
import numpy as np
import scipy
import scipy.misc
import scipy.cluster
import warnings
import requests
#Grab the Image from the html input



# Get data from fields
polished = form.getvalue('picture')

check = True

# Works just limited Api calls per month
# response = requests.post(
#     'https://api.remove.bg/v1.0/removebg',
#     files={'image_file': open(raw, 'rb')},
#     data={'size': 'auto'},
#     headers={'X-Api-Key': 'ZfMJ7BQ6sx6a9AkamPDLrVbm'},
# )
# if response.status_code == requests.codes.ok:
#     with open('no-bg.png', 'wb') as out:
#         polished = 'no-bg.png';
#         out.write(response.content)
# else:
#     print("Error:", response.status_code, response.text)

while check:
    warnings.filterwarnings("ignore", category=DeprecationWarning)
    NUM_CLUSTERS = 5

    # input image here
    im = Image.open(polished)
    im = im.resize((150, 150))  # optional, to reduce time
    ar = np.asarray(im)
    shape = ar.shape
    ar = ar.reshape(scipy.product(shape[:2]), shape[2]).astype(float)

    print('finding clusters')
    codes, dist = scipy.cluster.vq.kmeans(ar, NUM_CLUSTERS)

    vecs = scipy.cluster.vq.vq(ar, codes)  # assign codes
    counts, bins = scipy.histogram(vecs, len(codes))  # count occurrences

    index_max = scipy.argmax(counts)  # find most frequent
    peak = codes[index_max]
    colour = binascii.hexlify(bytearray(int(c) for c in peak)).decode('ascii')

    RGB = tuple(int(colour[i:i + 2], 16) for i in (0, 2, 4))
    if RGB == (0, 0, 0):
        print("Failure")
    else:
        print(colour)
        check = False
