-- migrate:up
CREATE TABLE groups (
  id              INT NOT NULL AUTO_INCREMENT,
  group_name      VARCHAR(200) NOT NULL,
  group_type      VARCHAR(50) NOT NULL,
  parent_group    INT,
  lecturer        int NOT NULL,
  academic_year   VARCHAR(100),
  class           VARCHAR(100),
  data            JSON,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (lecturer) REFERENCES users(id),
  FOREIGN KEY (parent_group) REFERENCES groups(id),
  INDEX(lecturer),
  FULLTEXT INDEX(group_name)
);

-- migrate:down
DROP TABLE IF EXISTS groups;
