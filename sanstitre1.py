run = True
while (run == True):
    ex = float(input("Entrez le numéro de l'exercice: "))
    if (ex == 1):
        #EXERCICE 1
        longeur = float(input(" longeur: "))
        largeur = float(input(" largeur: "))
        hauteur = float(input(" hauteur: "))
        surface = (longeur*hauteur+longeur*largeur+hauteur*longeur)
        volume = longeur * largeur * hauteur
        print("surface: ", surface)
        print("volume: ", volume)
    
    elif(ex == 2):
        #EXERCICE 2
        n = int(input("Saisissez n : "))
        d = int(input("Saisissez d : "))
        print("Quotient : ",n // d)
        print("Reste : ", n % d)
    
    elif(ex == 3):
        #EXERCICE 3
        n = int(input("Entrez un nombre et vous dirais s'il est pair ou impair : "))
        if (n % 2 == 0):
            print("Votre nombre est pair")
        else:
            print("Votre nombre est impair")
    
    elif(ex == 4):
        #EXERCICE 4
        a = int(input("Entrez votre année : "))
        if((a % 4 == 0) and (a % 100 != 0) or (a % 400 == 0)):
            print("Votre année est bissextile!")
        else:
            print("Votre année n'est pas bissextile!")
    
    elif(ex == 5):
        #EXERCICE 5
        d = int(input("Entrez votre temps en secondes: "))
        dh = d // 3600
        dm = (d % 3600) // 60
        ds = (d % 3600) % 60
        if(dh > 0):
            print("Durée : ", dh, "h:", dm, "m:", ds, "s")
        elif(dh <= 0):
            print("Durée : ", dm, "m:", ds, "s")
        elif(dh <= 0 and dm <= 0):
            print("Durée : ", ds, "s")
    
    elif(ex == 6):
        #EXERCICE 6
        import random
        diviseur = random.randint(2,5) 
        entier = int(input("Entrez un entier: "))
        print("Votre entier : ", entier)
        if (entier % diviseur == 0):
            print(entier, " est divisible par ", diviseur, " : gagné!")
        elif(entier % diviseur != 0):
            print()
            entier= int(input("Perdu! Recommencez : "))
            if (entier % diviseur == 0):
                print(entier, " est divisible par ", diviseur, " : gagné ouf!")
            else:
                print("Perdu! Il fallait un nombre divisible par ", diviseur, "...")
                
    elif(ex == 7):
        #EXERCICE 7
        choix = input("Etes-vous dans le magasin a ou b? : ")
        nb = int(input("Entrez le nombre d'articles : "))
        print("Nb d'articles: ", nb)
        prixU = float(input("Entrez le prix d'un article : "))
        print("Prix unitaire H.T. en euros: ", prixU)
        prixTTC = (nb * prixU) + (20/100)*(nb * prixU)
        if(choix == "a"):
            #a
            if(prixTTC >= 200):
                print("Montant T.T.C. en euros: ", prixTTC)
                print("Montant de la remise : ", prixTTC*5/100)
                prixTTC -= prixTTC * 5/100
                prixTTC = format(prixTTC, ".2f")
                print("Montant après la remise : ", prixTTC)
                
            else:
                prixTTC = format(prixTTC, ".2f")
                print("Montant T.T.C. en euros: ", prixTTC)
                print("(pas de remise)")
        elif(choix == "b"):
            #b
            if(prixTTC >= 200 and prixTTC < 500):
                print("Montant T.T.C. en euros: ", prixTTC)
                print("Montant de la remise : ", prixTTC*5/100)
                prixTTC -= prixTTC * 5/100
                prixTTC = format(prixTTC, ".2f")
                print("Montant après la remise : ", prixTTC)
            elif(prixTTC >= 500 and prixTTC < 1000):
                print("Montant T.T.C. en euros: ", prixTTC)
                print("Montant de la remise : ", prixTTC*7/100)
                prixTTC -= prixTTC * 7/100
                prixTTC = format(prixTTC, ".2f")
                print("Montant après la remise : ", prixTTC)
            elif(prixTTC >= 1000):
                print("Montant T.T.C. en euros: ", prixTTC)
                print("Montant de la remise : ", prixTTC*10/100)
                prixTTC -= prixTTC * 10/100
                prixTTC = format(prixTTC, ".2f")
                print("Montant après la remise : ", prixTTC)
        
    elif(ex == 8):
        #EXERCICE 8
        choix = input("Voulez-vous jouer au toto (entrez t) ou au casino (entrez c)? : ")
        if (choix == "c"):
            import random
            a, b, c = random.randint(0,9), random.randint(0,9), random.randint(0,9)
            print("|",a,"|",b,"|",c,"|")
            if (a == b and b == c):
                print("Vous avez gagné!!")
            else:
                print("Vous avez perdu!")
        elif (choix == "t"):
            import random
            list1 = ["<",">"]
            list2 = ["-","o"]    
            list3 = ["|","+"] 
            toto = random.choice(list1) + random.choice(list2) + random.choice(list3) + random.choice(list2) + random.choice(list1)
            print(toto)
            if (toto == "<o|o>"):
                print("Gagné!!")
            else:
                print("Perdu :(")
        else :
            print("Mauvaise saisie!")
            
    elif(ex == 9):
        #EXERCICE 9
        a = int(input("Entrez un entier entre 1 et 7 (bornes inclus)"))
        if(a == 1):
            print("Lundi")
        elif(a == 2):
            print("Mardi")
        elif(a == 3):
            print("Mercredi")
        elif(a == 4):
            print("Jeudi")
        elif(a == 5):
            print("Vendredi")
        elif(a == 6):
            print("Samedi")
        elif(a == 7):
            print("Dimanche")
        else:
            print("ERREUR, MAUVAISE SAISIE")
            
    elif(ex == 10):
        #EXERCICE 10 
        a = input("Entrez l'opération à effectuer entre les deux nombres (+ - * ou /) : ")

        z1real = int(input("Entrez la partie réelle du premier nombre : "))
        z1imag = int(input("Entrez la partie imaginaire du premier nombre : "))
        z2real = int(input("Entrez la partie réelle du deuxieme nombre : "))
        z2imag = int(input("Entrez la partie imaginaire du deuxieme nombre : "))
        z1,z2 = complex(z1real,z1imag), complex(z2real,z2imag)
        if (a == "+"):
            z = z1+z2
        elif(a == "-"):
            z = z1-z2
        elif(a == "*"):
            z = z1*z2
        elif(a == "/"):
            z = z1/z2
        
        print("Résultat : ", z.real,"+",z.imag,"i")
        
    elif(ex == 11):
        #EXERCICE 11
        import turtle
        turtle.hideturtle()
        turtle.fillcolor("yellow")
        turtle.begin_fill()
        turtle.circle(180)
        turtle.end_fill()
        turtle.penup()
        turtle.left(90)
        turtle.forward(360-1/4*360)
        turtle.left(90)
        turtle.forward(60)
        turtle.fillcolor("red")
        turtle.begin_fill()
        turtle.circle(10)
        turtle.end_fill()
        turtle.penup()
        turtle.left(180)
        turtle.forward(120)
        turtle.right(90)
        turtle.forward(20)
        turtle.left(90)
        turtle.begin_fill()
        turtle.circle(10)
        turtle.end_fill()
        turtle.penup()
        turtle.right(90)
        turtle.forward(185)
        turtle.right(90)
        turtle.pendown()
        turtle.forward(100)
        turtle.right(45)
        turtle.forward(25)
        turtle.penup()
        turtle.right(180)
        turtle.forward(25)
        turtle.left(45)
        turtle.forward(100)
        turtle.left(45)
        turtle.pendown()
        turtle.forward(20)
        turtle.penup()
        turtle.setpos(0,120)
        turtle.left(45)
        turtle.forward(50)
        turtle.pendown()
        turtle.forward(50)
        turtle.penup()
        print(turtle.position())
        turtle.exitonclick()
        break
    elif(ex == 12.1):
        #EXERCICE 12a
        d = {}
        points = ["Ax", "Ay", "Bx", "By"]
        
        for i in range(0,4):
            print("Entrez ", points[i], " : ")
            d[points[i]] = float(input())
        if(d[points[0]] == d[points[2]] and d[points[1]] == d[points[3]]):
            print("ERREUR IL NE PEUT PAS AVOIR DE DROITE ENTRE DEUX POINTS IDENTIQUES")
        elif(d[points[2]] - d[points[0]] == 0):
            print("Equation : x =", d[points[0]])
        else:
            coefdir = (d[points[3]]-d[points[1]])/((d[points[2]])-d[points[0]])
            b = d[points[2]] - coefdir * d[points[0]]
            print("Equation : y =", coefdir, "x +", b)
    #elif(ex == 12.2):
        