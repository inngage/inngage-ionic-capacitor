import { InngageSDK } from '@inngageregistry/inngage-ionic-capacitor';

const sdk = new InngageSDK();

window.addEventListener('DOMContentLoaded', async () => {
    // subscribe on load
    await sdk.registerSubscription({ appToken: 'c18151db3a0524ba1f9d4be3f68d5310', identifier: 'moura.bsaulo@gmail.com' });

    // push handlers (foreground + clique)
    await sdk.initPushHandlers({
        onReceive: (n) => console.log('📩 foreground:', n),
        onClick: ({ from, action }) => console.log('👆 click from', from, action)
    });

    // botão envia evento
    document.getElementById('btn-send')?.addEventListener('click', async () => {
        await sdk.sendEvent({
            appToken: 'c18151db3a0524ba1f9d4be3f68d5310',
            identifier: '...',
            name: 'button_click',
            source: 'example-app',
            params: { screen: 'home', ts: new Date().toISOString() },
        });
    });
});