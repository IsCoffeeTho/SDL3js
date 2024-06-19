# ============================================================================ #
#                                                                              #
#                                                               /   /   \      #
#   Made By Aaron "IsCoffeeTho" Menadue                       /    |      \    #
#                                                            |     |       |   #
#   Makefile                                                 |      \      |   #
#                                                            |       |     |   #
#   Last Edited: 10:20PM 19/06/2024                           \      |    /    #
#                                                               \   /   /      #
#                                                                              #
# ============================================================================ #

all: build
	node-gyp build

build:
	node-gyp configure

clean:
	rm build -r

fclean: clean

re: fclean all

test:
	bun start

.PHONY=all clean fclean re test