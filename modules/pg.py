from config import envSwitch
keys = envSwitch.keys()


def get_all_projects(db):
  SQL = "SELECT * FROM projects;"
  result = db.session.execute(SQL).fetchall()

  content = {}
  payload = []
  for row in result:
    content = {
      'id': row[0],
      'projectType': row[1],
      'website': row[2],
      'description': row[3],
      'repository': row[5],
      'icon': row[6],
      'secretKey': row[7],
      # 'createdAt': row[8],
      # 'updatedAt': row[9],
      'title': row[10],
      'version': row[11]
    }
  
    payload.append(content)
    content = {}

  return payload
  
def get_slides_from_project(db, id):
  SQL = 'SELECT * FROM slides WHERE "projectId" = '+id+';'
  result = db.session.execute(SQL).fetchall()

  content = {}
  payload = []
  for row in result:
    content = {
      "slideUrl": keys.BUCKET_ROOT+row[1],
      "description": row[2]
    }
    payload.append(content)
    content = {}

  return payload

