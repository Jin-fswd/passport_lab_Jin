const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  },
];

const userModel = {

  /* FIX ME (types) 😭 */
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  /* FIX ME (types) 😭 */
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findOrCreate: (profile: { id: string; username: string; email?: string }) => {
    // GitHub 사용자 고유 ID로 사용자 검색
    console.log('profile : ')
    console.log(profile);
    let user = database.find((user) => user.email === profile.id);
    if (!user) {
      // 사용자가 없다면 새로운 사용자 생성
      const newUser = {
        id: database.length + 1, // 간단한 ID 할당 방식
        name: profile.username,
        email: profile.email || `${profile.username}@github.com`, // GitHub 프로필에 이메일이 없는 경우 대체 값
        password: "", // GitHub 로그인 사용자는 비밀번호 필요 없음
      };
      database.push(newUser);
      user = newUser;
      console.log('database생성됨 : ')
      console.log(database)
    }
    
    return user;
  },
};

export { database, userModel };
