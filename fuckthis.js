function swapWithoutTemp_1(a_2, b_3) {
    a_2 -= b_3;
    b_3 = a_2 + b_3;
    a_2 = b_3 - a_2;
    return a_2;
}
swapWithoutTemp_1(30, 11);
