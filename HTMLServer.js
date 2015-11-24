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
    
    HTML_COLORS = ['Black', 'Green', 'Silver', 'Lime', 'Gray', 'Olive', 'White', 'Maroon', 'Navy', 'Red', 'Blue', 'Purple', 'Teal', 'Fuchsia', 'Aqua']
    colortable = HTML.Table(header_row=['Name', 'Color'])
    for colorname in HTML_COLORS:
    	colored_cell = HTML.TableCell(' ', bgcolor=colorname)
    	colortable.rows.append([colorname, colored_cell])

    http_body = """
	<!doctype html>
	<html>
	<body> 
	""" + colortable + """
	</body>
	</html>"""


    client_connection.send(http_status)
    client_connection.send(http_type)
    client_connection.send(http_body)
    client_connection.close()


