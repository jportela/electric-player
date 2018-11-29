import RpcServer from '../shared/ipc/node/rpc-server';
import Server from '../shared/ipc/node/server';
import AudioControllerChannel from './audio/channels/controller';
import SongCacheChannel from './audio/channels/song-cache';
import AudioController from './audio/controller';
import SongCache from './audio/song-cache';

const audioContext = new AudioContext();

const songCache = new SongCache(audioContext);
const audioController = new AudioController(audioContext, songCache);

const server = new Server('audio-worker');
const rpcServer = new RpcServer(server);

const audioControllerChannel = new AudioControllerChannel(rpcServer, audioController);
const songCacheChannel = new SongCacheChannel(rpcServer, songCache);

rpcServer.start();

audioControllerChannel.registerListeners();
songCacheChannel.registerListeners();
