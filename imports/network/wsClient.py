#############################################
##            MODULES VARIABLES
#############################################
print('Load wsClient')
import asyncio, threading
import sys, time, json, websockets, traceback

##########################
async def transfer(post, options):
##########################
    #print(f' \n***TRANSFER {post}')
    await options["connection"].send(json.dumps(post))
    
##########################
async def connect(options):
##########################
    while True:
        try:            
            async with websockets.client.connect(options["endpoint"]) as connection:
                print(f' \n***USER CONNECTED, endpoint: {options["endpoint"]}')
                loop = asyncio.get_running_loop()
                options['transfer'] = transfer
                options['connection'] = connection
    
                async for post in connection: await options['userEvent'](post, options)
        
            print(' \n***DISCONNECTED')
        except:
            print('Abort onConnect', sys.exc_info()[0])
            #traceback.print_exc()
       
##########################
def start(options):
##########################
    print('Start wsClient')

    try:
        asyncio.set_event_loop(asyncio.new_event_loop())
        asyncio.get_event_loop().run_until_complete(connect(options))
    except:
        print('Abort: wsClient', sys.exc_info()[0])
        traceback.print_exc()

##########################
#         MAIN
##########################
# Run this module on main thread to unit test with following code
if __name__ == '__main__':
    pass