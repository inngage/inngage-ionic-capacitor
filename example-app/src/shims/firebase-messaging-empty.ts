export const isSupported = async () => false;
export const getMessaging = () => { throw new Error('firebase web não habilitado'); };
export const getToken = async () => null;
export const deleteToken = async () => { };
export const onMessage = () => () => { };