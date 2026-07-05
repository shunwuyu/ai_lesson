from sqlalchemy import create_engine, String, Integer, DateTime, Float, ForeignKey, func, select
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Mapped, mapped_column, relationship

engine = create_engine("sqlite:///./student_course.db", echo=True)
# 相当于你雇了一个极度听话、绝不擅作主张的助手：
# 你在内存里怎么折腾数据，他都不管（不自动 flush）。
# 你折腾完了，他也不会自动帮你保存（不自动 commit）。
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

class Base(DeclarativeBase):
    pass

# Student（学生）一对多 Enrollment（选课记录）
# 一个学生可以有多条选课记录；Enrollment 靠 student_id 外键关联学生主键 id
# Course（课程）一对多 Enrollment（选课记录）
# 一门课能被多个学生选；Enrollment 靠 course_id 外键关联课程主键 id
# Student 和 Course 本身无直接外键，依靠中间表 Enrollment 实现多对多
# 一个学生 → 多门课程
# 一门课程 → 多个学生

class Enrollment(Base):
  __tablename__ = "enrollments"
  id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
  student_id: Mapped[int] = mapped_column(ForeignKey("students.id"))
  course_id: Mapped[int] = mapped_column(ForeignKey("courses.id"))
  enrolled_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())
  score: Mapped[float | None] = mapped_column(default=None)

  # 反向关联学生、课程
  # back_populates="enroll_records"：反向关联开关，学生模型里有个叫 enroll_records 
  # 的关联字段，两边互相映射，改一边另一边自动同步。
  student: Mapped["Student"] = relationship(back_populates="enroll_records")
  course: Mapped["Course"] = relationship(back_populates="enroll_records")
  # __repr__ 是对象官方字符串表示，打印、控制台查看对象时自动触发。
  # representation
  def __repr__(self):
    return f"<Enrollment(id={self.id}, score={self.score})>"

# 学生模型 Student
class Student(Base):
  __tablename__ = "students"
  id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
  name: Mapped[str] = mapped_column(String(50), nullable=False)
  email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

  # 关联选课中间表
  enroll_records: Mapped[list[Enrollment]] = relationship(back_populates="student")
  # 题目要求：enrolled_courses 存储所选课程
  @property
  def enrolled_courses(self):
    return [record.course for record in self.enroll_records]

  def __repr__(self):
    return f"<Student(id={self.id}, name='{self.name}')>"

# 课程模型 Course
class Course(Base):
  __tablename__ = "courses"
  id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
  title: Mapped[str] = mapped_column(String(100), nullable=False)
  description: Mapped[str | None] = mapped_column(String(1000), default=None)

  # 关联选课中间表
  enroll_records: Mapped[list[Enrollment]] = relationship(back_populates="course")
  # 题目要求：students 存储选这门课的学生
  # @property 只是 Python 运行时动态计算的虚拟属性
  @property
  def students(self):
      return [record.student for record in self.enroll_records]

  def __repr__(self):
      return f"<Course(id={self.id}, title='{self.title}')>"

# 3. 创建数据表
Base.metadata.create_all(bind=engine)

# 4. CRUD练习功能实现
def student_course_demo():
    session = SessionLocal()
    try:
        # a) 创建一个学生、一门课程
        stu = Student(name="李明", email="liming@school.com")
        cou = Course(title="Python开发", description="零基础Python编程课程")
        session.add_all([stu, cou])
        session.commit()
        session.refresh(stu)
        session.refresh(cou)
        print(f"【创建】学生：{stu}")
        print(f"【创建】课程：{cou}")

        # b) 学生选修课程，生成Enrollment选课记录
        enroll = Enrollment(student_id=stu.id, course_id=cou.id, score=85.0)
        session.add(enroll)
        session.commit()
        session.refresh(enroll)
        print(f"【选课成功】选课记录：{enroll}")

        # c) 查询该学生选了哪些课程
        stu_stmt = select(Student).where(Student.id == stu.id)
        target_student = session.scalars(stu_stmt).first()
        print("\n【学生所选课程】")
        for c in target_student.enrolled_courses:
            print(f"- {c.title}")

        # d) 查询该课程有哪些学生
        cou_stmt = select(Course).where(Course.id == cou.id)
        target_course = session.scalars(cou_stmt).first()
        print("\n【课程选课学生】")
        for s in target_course.students:
            print(f"- {s.name}")

        # e) 更新学生这门课的成绩
        enroll.score = 92.5
        session.commit()
        print(f"\n【更新成绩】新分数：{enroll.score}")

    except Exception as e:
        print("执行出错，回滚事务：", e)
        session.rollback()
    finally:
        session.close()

if __name__ == "__main__":
    student_course_demo()