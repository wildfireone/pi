import socket
import HTML
HOST, PORT = '', 8888
listen_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
listen_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
listen_socket.bind((HOST, PORT))
listen_socket.listen(1)
print 'Serving HTTP on port %s ...' % PORT
while True:
    client_connection, client_address = listen_socket.accept()
    request = client_connection.recv(1024)

    http_status = "HTTP/1.1 200 OK \n"
    http_type = "Content-Type: text/html\n"
    
    table_data = [
        ['Last name',   'First name',   'Age'],
        ['Smith',       'John',         30],
        ['Carpenter',   'Jack',         47],
        ['Johnson',     'Paul',         62],
    ]

    http_body = """
	<!doctype html>
	<html>
	<body>
	""" + HTML.table(table_data) + """
	</body>
	</html>"""

    client_connection.sendall(http_response)
    client_connection.close()
