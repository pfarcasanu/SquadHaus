// eslint-disable-next-line no-bitwise
const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

const uuid = () => (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);

const key = () => `key-${S4()}-${S4()}`;

export default uuid;

export {
  key,
};
