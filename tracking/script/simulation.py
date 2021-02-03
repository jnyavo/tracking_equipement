import time
import sys
import random
from crate import client



def getRandomPosition():
    #position au hasard autour de l'université

    lat_min = -20.2440
    lat_max = -20.2446

    lng_min = 57.4531
    lng_max = 57.4539

    return f'POINT ({random.uniform(lng_min,lng_max)} {random.uniform(lat_min, lat_max)})'

def insert(id,position,connection):
    
    cursor = connection.cursor()
    try:
        cursor.execute(
            "UPDATE equipement SET position=? WHERE id=?", [position,id]
        )
        print("UPDATE OK")
    except Exception as err:
        print("UPDATE ERROR: %s" % err)
        return


if __name__ == "__main__":
    try:
        connection = client.connect("localhost:4200")
        print("CONNECT OK")
    except Exception as err:
        print("CONNECT ERROR: %s" % err)
        exit()

    while True:
        position = getRandomPosition()
        print(sys.argv[1],position,sep=" ")
        insert(sys.argv[1],position,connection)
        time.sleep(0.5)