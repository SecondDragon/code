import { faker } from '@faker-js/faker';

const namesArray = []

for (let i = 0; i < 10000; i++) {
  namesArray.push(faker.name.fullName())
}

export default namesArray
