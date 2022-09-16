//标志法
var hasCycle = function(head) {
    while (head) {
        if (head.flag) return true;
        head.flag = true;
        head = head.next
    }
    return false
}

//快慢指针

var hasCycle2 = function(head) {
    if (!head || !head.next) return false;
    let fast = head.next.next;
    let slow = head
    if (fast !== slow) {
        if (!fast || !fast.next) return false;
        fast = fast.next.next;
        slow = slow.next
    }
}